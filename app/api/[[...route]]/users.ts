import { Hono } from "hono";
import { and, eq, inArray } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { users, insertUserSchema } from "@/db/schema";
import { z } from "zod";

const app = new Hono()
    .get(
      "/",
      async (c) => {
        const data = await db
          .select({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
          })
          .from(users);

        return c.json({ data })
    })
    .get(
      "/:id",
      zValidator("param", z.object({
        id: z.string().optional(),
      })),
      async (c) => {
        const { id } = c.req.valid("param");

        if (!id) {
          return c.json({ error: "Missing id" }, 400);
        }

        const [data] = await db
          .select({
            id: accounts.id,
            name: accounts.name,
          })
          .from(accounts)
          .where(
            eq(accounts.id, id)
          );
        
        if (!data) {
          return c.json({error: "Not found" }, 404);
        }  

        return c.json({ data });
      }
    )
    .post(
        "/",
        zValidator("json", insertUserSchema.pick({
            name: true,
        })),
        async (c) => {
          const values = c.req.valid("json");

          const data = await db.insert(users).values({
            id: createId(),
            userId: auth.userId,
            ...values,
          }).returning();

          return c.json({ data });
    })
    .post(
      "/bulk-delete",
      zValidator(
        "json",
        z.object({
          ids: z.array(z.string()),
        }),
      ),
      async (c) => {
        const values = c.req.valid("json");

        const data = await db
          .delete(accounts)
          .where(
            and(
              inArray(accounts.id, values.ids)
            )
          )
          .returning({
            id: accounts.id,
          });
        
        return c.json({ data });  
      }
    )
    .patch(
      "/:id",
      zValidator(
        "param",
        z.object({
          id:  z.string().optional()
        })
      ),
      zValidator(
        "json",
        insertAccountSchema.pick({
          name: true,
        })
      ),
      async (c) => {
        const { id } = c.req.valid("param");
        const values = c.req.valid("json");

        if (!id) {
          return c.json({ error: "Missing id"}, 400);
        }

        const [data] = await db
          .update(accounts)
          .set(values)
          .where(
            eq(accounts.id, id),
          )
          .returning();
        
        if (!data) {
          return c.json({ error : "Not found" }, 404)
        }  

        return c.json({ data });
      }
    )
    .delete(
      "/:id",
      zValidator(
        "param",
        z.object({
          id:  z.string().optional()
        })
      ),
      async (c) => {
        const { id } = c.req.valid("param");

        if (!id) {
          return c.json({ error: "Missing id"}, 400);
        }

        if (!auth?.userId) {
          return c.json({ error: "Unauthorized"}, 401);
        }

        const [data] = await db
          .delete(accounts)
          .where(
            eq(accounts.id, id),
          )
          .returning({
            id: accounts.id,
          });
        
        if (!data) {
          return c.json({ error : "Not found" }, 404)
        }  

        return c.json({ data });
      }
    )

export default app;