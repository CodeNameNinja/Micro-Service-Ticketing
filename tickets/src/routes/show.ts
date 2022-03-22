import express, { Request, Response } from "express";
import { NotFoundError } from "@channel360/common";
import { Ticket } from "../models/ticket";
const router = express.Router();

router.get('/api/ticket/:id', async(req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        throw new NotFoundError();
    }
    res.sendStatus(200).send(ticket);
});
 

export { router as showTicketRouter} ;