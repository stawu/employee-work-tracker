using EWT_Application.Commands;
using EWT_Application.Queries;
using EWT_Domain;
using EWT_Web.DTO;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWT_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IMediator mediator;

        public EmployeeController(IMediator mediator)
        {
            this.mediator = mediator;
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task PostEmployee(EmployeeRequestDTO employeeRequest)
        {
            await mediator.Send(new AddEmployeeCommand(
                new Employee(employeeRequest.Name, employeeRequest.LastName)));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<EmployeeResponseDTO>> GetEmployees()
        {
            var employees = await mediator.Send(new GetEmployeesQuery());

            return employees.Select(e => new EmployeeResponseDTO 
            { 
                Id = e.Id.Value, 
                Name = e.Name, 
                LastName = e.LastName 
            });
        }
    }
}
