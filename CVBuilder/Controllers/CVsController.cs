using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CVBuilder.Data;
using CVBuilder.Models;
using System.Security.Claims;

namespace CVBuilder.Controllers
{
    public class CVsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CVsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: CVs
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.CVs.Include(c => c.User);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: CVs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.CVs == null)
            {
                return NotFound();
            }

            var cV = await _context.CVs
                .Include(c => c.User)
                .FirstOrDefaultAsync(m => m.CVId == id);
            if (cV == null)
            {
                return NotFound();
            }

            return View(cV);
        }

        // GET: CVs/Create
        public IActionResult Create()
        {
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id");
            return View();
        }

        // POST: CVs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("CVId,Name,UserId,PersonalInformationId")] CV cV)
        {
            if (ModelState.IsValid)
            {
                _context.Add(cV);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id", cV.UserId);
            return View(cV);
        }

        // GET: CVs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.CVs == null)
            {
                return NotFound();
            }

            var cV = await _context.CVs.FindAsync(id);
            if (cV == null)
            {
                return NotFound();
            }
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id", cV.UserId);
            return View(cV);
        }

        // POST: CVs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("CVId,Name,UserId,PersonalInformationId")] CV cV)
        {
            if (id != cV.CVId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(cV);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CVExists(cV.CVId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id", cV.UserId);
            return View(cV);
        }

        // GET: CVs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.CVs == null)
            {
                return NotFound();
            }

            var cV = await _context.CVs
                .Include(c => c.User)
                .FirstOrDefaultAsync(m => m.CVId == id);
            if (cV == null)
            {
                return NotFound();
            }

            return View(cV);
        }

        // POST: CVs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.CVs == null)
            {
                return Problem("Entity set 'ApplicationDbContext.CVs'  is null.");
            }
            var cV = await _context.CVs.FindAsync(id);
            if (cV != null)
            {
                _context.CVs.Remove(cV);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CVExists(int id)
        {
          return (_context.CVs?.Any(e => e.CVId == id)).GetValueOrDefault();
        }
    }
}
