using LibraryManagementAPI.Data.Repository;
using LibraryManagementAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        public BooksController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet]
        [Route("GetAllBooks")]
        public async Task<ActionResult<IEnumerable<Book>>> GetAllBooks()
        {
            var books = await _bookRepository.GetAllAsync();
            return Ok(books);
        }

        [HttpGet("{id:int}", Name = "getBookById")]
        public async Task<ActionResult<Book>> getBookById(int id)
        {
            var book = await _bookRepository.GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound($"Book with ID {id} not found.");
            }
            return Ok(book);
        }

        [HttpGet("{name:alpha}", Name = "getBookByName")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<Book>> getBookByName(string name)
        {
            var book = await _bookRepository.GetBookByNameAsync(name);
            if (book == null)
            {
                return NotFound($"Book with name {name} not found.");
            }
            return Ok(book);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                var result = await _bookRepository.DeleteBookAsync(id);
                if (!result)
                {
                    return NotFound($"Book with ID {id} not found.");
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book book)
        {
            if (book == null) return BadRequest("Book is null.");
            if (id != book.BookId)
            {
                return BadRequest("Book ID mismatch.");
            }
            try
            {
                var updatedBookId = await _bookRepository.UpdateBookAsync(book);
                return Ok(new { message = $"Book with ID {updatedBookId} updated successfully." });
            }
            catch (InvalidOperationException)
            {
                return NotFound($"Book with ID {id} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("CreateBook")]
        public async Task<IActionResult> CreateBook([FromBody] Book book)
        {
            if (book == null) return BadRequest("Book is null.");
            try
            {
                var newBookId = await _bookRepository.CreateBookAsync(book);
                return CreatedAtRoute("getBookById", new { id = newBookId }, book);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPatch("{id:int}/partialUpdate")]
        public async Task<IActionResult> PartialUpdateBook(int id, [FromBody] JsonPatchDocument<Book> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest("Invalid patch document.");
            }
            var existingBook = await _bookRepository.GetBookByIdAsync(id);
            if (existingBook == null)
            {
                return NotFound($"Book with ID {id} not found.");
            }

            patchDoc.ApplyTo(existingBook, (Microsoft.AspNetCore.JsonPatch.Adapters.IObjectAdapter)ModelState);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await _bookRepository.UpdateBookAsync(existingBook);
                return Ok(new { message = $"Book with ID {id} partially updated successfully." });
            }
            catch (InvalidOperationException)
            {
                return NotFound($"Book with ID {id} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}