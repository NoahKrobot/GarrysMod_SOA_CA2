using GarrysMod.Controllers;
using GarrysMod.DTOs;
using GarrysMod.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Tests
{
    public class FetchCategories
    {
        private Mock<ICategory> _mockService = null!;
        private CategoriesController _controller = null!;

        [SetUp]
        public void Setup()
        {
            _mockService = new Mock<ICategory>();
            _controller = new CategoriesController(_mockService.Object);
        }

        [Test]
        public async Task Test_GetCategories()
        {
            var MOQCategories = new List<DTO_Category>
            {
                new DTO_Category { ID = 1, Name = "Weapons", PopularityMeter = 10 },
                new DTO_Category { ID = 2, Name = "Tools",   PopularityMeter = 5  }
            };


            _mockService
            .Setup(s => s.GetAllCategories())
            .ReturnsAsync(MOQCategories);

            var result = await _controller.GetCategories();

            Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());

            var objectResultInstance = (OkObjectResult)result.Result;
            Assert.That(objectResultInstance.Value, Is.EqualTo(MOQCategories));
        }
    }
}