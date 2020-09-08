class Task {
    constructor(id, name, note, priority, ) {
        this.name = name;
        this.id =id;
        this.note = note;
        this.priority = priority;
    }

    getId() {
        return id;
    }

    getname() {
        return name;
    }

    getNote() {
        return note;
    }

    setNote(note) {
        this.note = note;
    }

    
}

export { Task }