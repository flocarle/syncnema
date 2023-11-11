import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { env } from "~/env.mjs";
import { create, deleteUser } from "~/services/usersService";

const webhookSecret = env.WEBHOOK_SECRET;

const handler = async (
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse,
) => {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (_) {
    // If the verification fails, return a 400 error
    return res.status(400).json({});
  }

  const eventType = evt.type;
  if (eventType === "user.created") {
    try {
      await create({
        id: evt.data.id,
        email: evt.data.email_addresses[0]?.email_address ?? "",
      });
      res.status(201).json({});
    } catch (_) {
      return res.status(400).json({});
    }
  }

  if (eventType === "user.deleted") {
    if (evt.data.id) {
      try {
        await deleteUser({ id: evt.data.id ?? "" });

        res.status(204).json({ success: "User deleted successfully" });
      } catch (_) {
        return res.status(400).json({});
      }
    }
  }
};

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

export default handler;
