import { Request, Response } from 'express';
import { INotes } from '../modules/notes/model';
import NotesService from '../modules/notes/service';
export class NotesController
{
    private notes_service: NotesService = new NotesService();
    public create(req: Request, res: Response) {
        const notes: INotes = {
            title: req.body.title,
            note: req.body.note,
            created_date: new Date
        };
        this.notes_service.create(
            notes,
            (err: any, user_data: INotes) => {
                if (err) {
                    res.status(400).json({status: 'error'});
                } else {
                    const user_filter = { _id: user_data._id};
                    this.notes_service.filterUser(user_filter, (err: any, user_data: INotes) => {
                        if (err) {
                            res.status(400).json({status: 'error'});
                        } else {
                            res.status(200).json({status: 'success', data: user_data});
                        }
                    });
                }
            }
        );
    }

    public get(req: Request, res: Response) {
        const data = this.notes_service.getAll().then((data) => {
            res.status(200)
                .json({
                    status: 'success',
                    data: data
                });
        });
    }

    public findById(req: Request, res: Response) {
        if (req.params.id) {
            console.log(req.params.id);
            const filter = { _id: req.params.id};
            this.notes_service.filterUser(filter, (err: any, note: INotes) => {
                if (!err) {
                    res.status(200)
                        .json({
                            status: 'success',
                            data: note
                        });
                } else {
                    res.status(400)
                        .json({
                            status: 'Error',
                            message: 'Data not found'
                        });
                }
            });
        } else {
            res.status(400)
                .json({
                    status: 'Error',
                    message: 'Id must not empty'
                });
        }
    }


    public delete(req: Request, res: Response) {
        if (req.params.id) {
            this.notes_service.delete(req.params.id, (err: any, delete_details: any) => {
                if (delete_details.deletedCount) {
                    res.status(200)
                        .json({
                            status: 'Success',
                            data: delete_details
                        });
                } else {
                    res.status(400)
                        .json({
                            status: 'Error',
                            message: 'Failed delete note'
                        });
                }
            });
        } else {
            res.status(400)
                .json({
                    status: 'Error',
                    message: 'Id must not empty'
                });
        }
    }

    public update(req: Request, res: Response) {
        if (req.params.id) {
            const param: INotes = {
                _id: req.params.id,
                title: req.body.title,
                note: req.body.note
            };
            this.notes_service.update(param, (err: any) => {
                if (err) {
                    res.status(400)
                        .json({
                            status: 'Error',
                            message: 'Failed update note'
                        });
                } else {
                    res.status(200)
                        .json({
                            status: 'Success',
                            data: param
                        });
                }
            });
        } else {
            res.status(400)
                .json({
                    status: 'Error',
                    message: 'Id must not empty'
                });
        }
    }
}