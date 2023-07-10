using CVBuilder.Data;
using CVBuilder.Models;
using Microsoft.EntityFrameworkCore;

namespace CVBuilder.Controllers
{
    public static class CVEndpoints
    {
        public static void MapCVEndpoints(this IEndpointRouteBuilder routes)
        {
            routes.MapGet("/api/CV", async (ApplicationDbContext db) =>
            {
                return await db.CVs.ToListAsync();
            })
            .WithName("GetAllCVs");

            routes.MapGet("/api/CV/{id}", async (int CVId, ApplicationDbContext db) =>
            {
                return await db.CVs.FindAsync(CVId)
                    is CV model
                        ? Results.Ok(model)
                        : Results.NotFound();
            })
            .WithName("GetCVById");

            routes.MapPut("/api/CV/{id}", async (int CVId, CV cV, ApplicationDbContext db) =>
            {
                var foundModel = await db.CVs.FindAsync(CVId);

                if (foundModel is null)
                {
                    return Results.NotFound();
                }

                db.Update(cV);

                await db.SaveChangesAsync();

                return Results.NoContent();
            })
            .WithName("UpdateCV");

            routes.MapPost("/api/CV/", async ( ApplicationDbContext db) =>
            {
                CV cV = null;
                db.CVs.Add(cV);
                await db.SaveChangesAsync();
                return Results.Created($"/CVs/{cV.CVId}", cV);
            })
            .WithName("CreateCV");


            routes.MapDelete("/api/CV/{id}", async (int CVId, ApplicationDbContext db) =>
            {
                if (await db.CVs.FindAsync(CVId) is CV cV)
                {
                    db.CVs.Remove(cV);
                    await db.SaveChangesAsync();
                    return Results.Ok(cV);
                }

                return Results.NotFound();
            })
            .WithName("DeleteCV");
        }
    }
}

