using GarrysMod.Controllers;
using GarrysMod.DTOs;
using GarrysMod.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public class FetchCreators
    {
        private Mock<ICreator> _mockService = null!;
        private CreatorsController _controller = null!;

        [SetUp]
        public void Setup()
        {
            _mockService = new Mock<ICreator>();
            _controller = new CreatorsController(_mockService.Object);
        }

        [Test]
        public async Task Test_GetCreators()
        {
            var MOQCreators = new List<DTO_Creator>
            {
                new DTO_Creator
                {
                    ID = 1,
                    Username = "admin",
                    Password = "12534",
                    IsAdmin = true
                },
                new DTO_Creator
                {
                    ID = 2,
                    Username = "normalUser",
                    Password = "421525",
                    IsAdmin = false
                }
            };


            _mockService
            .Setup(s => s.GetAllCreators())
            .ReturnsAsync(MOQCreators);

            var result = await _controller.GetCreators();

            Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());

            var objectResultInstance = (OkObjectResult)result.Result;
            Assert.That(objectResultInstance.Value, Is.EqualTo(MOQCreators));
        }
    }
}
