// export default class Ticket {
//     static STATUS = Object.freeze({
//       NEW: { name: "new" },
//       IN_PROGRESS: { name: "in progress" },
//       RESOLVED: { name: "resolved" },
//     });

//     validateStatus = (Ticket.STATUS) => {}

//     constructor(id, name, email, description, status) {
//       this.id = id;
//       this.name = name;
//       this.email = email;
//       this.description = description;

//       if (!Object.values(Ticket.STATUS).some(s => s.name === status)) {
//         throw new Error(`Invalid status: ${status}`);
//       }
//       this.status = status;
//     }

//     updateStatus(newStatus) {
//       if (!Object.values(Ticket.STATUS).some(s => s.name === newStatus)) {
//         throw new Error(`Invalid status: ${newStatus}`);
//       }
//       this.status = newStatus;
//     }
//   }
