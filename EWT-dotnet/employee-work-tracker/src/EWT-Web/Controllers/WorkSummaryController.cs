using EWT_Application;
using EWT_Application.Errors;
using EWT_Application.Queries;
using EWT_Web.DTO;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWT_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkSummaryController : ControllerBase
    {
        private readonly IMediator mediator;

        public WorkSummaryController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("{employeeId}/short")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetShortSummaryOfEmployeeBetween(
            [FromRoute] Guid employeeId,
            [FromQuery] [Required] DateTime fromInclusive, 
            [FromQuery] [Required] DateTime toInclusive)
        {
            if (toInclusive < fromInclusive)
                return BadRequest();

            var result = await mediator.Send(new GetShortWorkSummaryOfEmployeeQuery(employeeId, fromInclusive, toInclusive));

            if (result.HasError<EmployeeNotExistsError>())
                return NotFound();
            else if (result.IsFailed)
                throw new NotImplementedException();

            ShortWorkSummary sWrkSm = result.Value;

            return Ok(new ShortWorkSummaryResponseDTO
            {
                StartDateTime = sWrkSm.StartDateTime,
                EndDateTime = sWrkSm.EndDateTime,
                MinutesOfWork = sWrkSm.MinutesOfWork,
                DaysStatuses = sWrkSm.DaysStatuses.Select(dayStatus => 
                    new DayInformations 
                    { 
                        Date = dayStatus.date,
                        DayStatus = dayStatus.dayStatus
                    })
            });
        }

        [HttpGet("{employeeId}/detailed")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetDetailedSummaryOfEmployeeBetween(
            [FromRoute] Guid employeeId,
            [FromQuery][Required] DateTime fromInclusive,
            [FromQuery][Required] DateTime toInclusive)
        {
            if (toInclusive < fromInclusive)
                return BadRequest();

            var result = await mediator.Send(new GetDetailedWorkSummaryOfEmployeeQuery(employeeId, fromInclusive, toInclusive));

            if (result.HasError<EmployeeNotExistsError>())
                return NotFound();
            else if (result.IsFailed)
                throw new NotImplementedException();

            DetailedWorkSummary sWrkSm = result.Value;

            return Ok(new DetailedWorkSummaryResponseDTO
            {
                StartDateTime = sWrkSm.StartDateTime,
                EndDateTime = sWrkSm.EndDateTime,
                MinutesOfWork = sWrkSm.MinutesOfWork,
                WorkDurations = sWrkSm.WorkDurations.Select(workDuration =>
                    new WorkDurationDTO
                    {
                        StartDateTimeInstant = workDuration.StartDateTimeInstant,
                        EndDateTimeInstant = workDuration.EndDateTimeInstant
                    })
            });
        }
    }
}
