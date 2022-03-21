export class TaskClass {
    constructor(name, description, checked = false, creationDate = "", editedDate = "", checkedDate = "") {
        this.name = name;
        this.description = description;
        this.checked = checked;
        this.creationDate = creationDate;
        this.editedDate = editedDate;
        this.checkedDate = checkedDate;
    }
}
