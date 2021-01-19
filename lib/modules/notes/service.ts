import { INotes } from './model';
import notes from './schema';

export default class NotesService {
    
    public create(n: INotes, callback: any) {
        n.created_date = new Date();
        const _session = new notes(n);
        _session.save(callback);
    }

    public filterUser(query: any, callback: any) {
        query.deleted_date = { $eq : null };
        notes.findOne(query, callback);
    }

    public async getAll() {
        return notes.find({deleted_date: { $eq : null }});
    }

    public delete(_id: string, callback: any) {
        const filter = { _id: _id};
        this.filterUser(filter, (err: any, note: INotes) => {
            if (!err) {
                note.deleted_date = new Date();
                this.update(note, (err: any) => {
                    if (!err) {
                        console.log('Note has been deleted');
                    }
                });
            }
        });
        // notes.deleteOne(query, callback);
    }

    public update(note: INotes, callback: any) {
        note.updated_date = new Date();
        const query = { _id: note._id };
        notes.findOneAndUpdate(query, note, callback);
    }
}