using EWT_Application.Commands;
using EWT_Application.Errors;
using EWT_Domain;
using EWT_Web.DTO;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace EWT_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkEventController : ControllerBase
    {
        private readonly IMediator mediator;

        public WorkEventController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> PostWorkEvent(WorkEventRequestDTO workEventRequest)
        {
            var result = await mediator.Send(new AddWorkEventCommand(
                workEventRequest.EmployeeId, new WorkEvent(workEventRequest.dateTimeInstant)));

            if (result.HasError<EmployeeNotExistsError>())
                return NotFound();
            else if (result.HasError<WorkEventAlreadyExistsError>())
                return Conflict();
            else if (result.IsFailed)
                throw new NotImplementedException();

            return Ok();
        }
    }
}
