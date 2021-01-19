import { NotesController } from '../controllers/NotesController';
import { Application, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';

export class Api {
    private notesController: NotesController = new NotesController();
    public route(app: Application) {
        app.get('/api/users', (req: Request, res: Response) => {
            this.notesController.get(req, res);
        });
        app.get('/api/users/:id', (req: Request, res: Response) => {
            this.notesController.findById(req, res);
        });
        app.delete('/api/users/:id', (req: Request, res: Response) => {
            this.notesController.delete(req, res);
        });
        app.post('/api/users', [
            body('title').not().isEmpty(),
            body('note').not().isEmpty()
        ], (req: Request, res: Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            this.notesController.create(req, res);
        });

        app.put('/api/users/:id', [
            body('title').not().isEmpty(),
            body('note').not().isEmpty(),
        ], (req: Request, res: Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            this.notesController.update(req, res);
        });
    }
}