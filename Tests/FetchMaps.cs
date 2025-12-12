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
    public class FetchMaps
    {
        private Mock<IMap> _mockService = null!;
        private MapsController _controller = null!;

        [SetUp]
        public void Setup()
        {
            _mockService = new Mock<IMap>();
            _controller = new MapsController(_mockService.Object);
        }

        [Test]
        public async Task Test_GetMaps()
        {
            var MOQMaps = new List<DTO_Map>
            {
                new DTO_Map{ 
                    Id = 1, Name = "gm_construct",
                    Description = "Sandbox map",
                    SizeInMB = 12.5
                },

                  new DTO_Map
                {
                    Id = 2,
                    Name = "gm_construct_betav13",
                    Description = "Sandobox map, but beta v13",
                    SizeInMB = 60.777777777777
                },

            };

            _mockService
            .Setup(s => s.GetAllMaps())
            .ReturnsAsync(MOQMaps);

            var result = await _controller.GetMaps();

            Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());

            var objectResultInstance = (OkObjectResult)result.Result;
            Assert.That(objectResultInstance.Value, Is.EqualTo(MOQMaps));
        }
    }
}
