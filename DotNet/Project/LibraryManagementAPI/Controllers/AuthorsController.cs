using LibraryManagementAPI.Data.Repository;
using LibraryManagementAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly IAuthorRepository _authorRepository;
        public AuthorsController(IAuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }

        [HttpGet]
        [Route("GetAllAuthors")]
        public async Task<ActionResult<IEnumerable<Author>>> GetAllAuthors()
        {
            var authors = await _authorRepository.GetAllAsync();
            if (authors == null || !authors.Any())
            {
                return NotFound("No Author Found.");
            }

            return Ok(authors);
        }

        [HttpGet("{id:int}", Name = "getauthorbyid")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<Author>> getauthorbyid(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid author ID");
            }

            var author = await _authorRepository.GetAuthorByIdAsync(id);

            if (author == null)
            {
                return NotFound($"Id {id} is not present in the records.");
            }

            return Ok(author);
        }

        [HttpGet("{name:alpha}", Name = "GetAuthorByName")]
        public async Task<ActionResult<Author>> GetAuthorByName(string name)
        {
            var author = await _authorRepository.GetAuthorByNameAsync(name);
            if (author == null)
            {
                return NotFound($"Author with name {name} not found.");
            }
            return Ok(author);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            var deleting = await _authorRepository.GetAuthorByIdAsync(id);
            if (deleting == null) return NotFound($"Author with ID {id} not found.");
            var ok = await _authorRepository.DeleteAuthorAsync(id);
            if (!ok) return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete author");
            return NoContent();
        }

        [HttpPost("createAuthor")]
        public async Task<ActionResult<Author>> createAuthor([FromBody] Author author)
        {
            if (author == null)
            {
                return BadRequest("Author is null");
            }
            var id = await _authorRepository.CreateAuthorAsync(author);
            return CreatedAtRoute("getauthorbyid", new { id = id }, author);
        }

        [HttpPut]
        [Route("updateAuthor")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<ActionResult> updateAuthor([FromBody] Author author)
        {
            if (author == null)
            {
                return BadRequest("Author is null");
            }
            var existingAuthor = await _authorRepository.GetAuthorByIdAsync(author.AuthorID);
            if (existingAuthor == null)
            {
                return NotFound($"Author with ID {author.AuthorID} not found");
            }

            existingAuthor.Name = author.Name;
            existingAuthor.Country = author.Country;
            await _authorRepository.UpdateAuthorAsync(existingAuthor);
            return NoContent();
        }

        [HttpPatch]
        [Route("{id:int}/updatePartial")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<ActionResult> updatePartialAuthor(int id, [FromBody] JsonPatchDocument<Author> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest("Patch document is null");
            }
            var existingAuthor = await _authorRepository.GetAuthorByIdAsync(id);
            if (existingAuthor == null)
            {
                return NotFound($"Author with ID {id} not found");
            }

            patchDoc.ApplyTo(existingAuthor, (Microsoft.AspNetCore.JsonPatch.Adapters.IObjectAdapter)ModelState);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _authorRepository.UpdateAuthorAsync(existingAuthor);
            return NoContent();
        }
    }
}
