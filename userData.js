var id = 1;

var userData = {
  users: [
    { id: id++, name: "john", email: "john@mail.com", ph: 9876 },
    { id: id++, name: "Bob", email: "bob@gmail.com", ph: 1234 },
    { id: id++, name: "Dan", email: "Dan@mail.com", ph: 5678 },
    { id: id++, name: "Joe", email: "Joe@mail.com", ph: 3482 },
    { id: id++, name: "Jack", email: "jack@mail.com", ph: 4642 },
    { id: id++, name: "Carol", email: "carol@mail.com", ph: 8520 },
  ],

  getUsers: function () {
    return this.users;
  },

  getUserById: function (id) {
    let user = null;
    for (let i = 0; i < this.users.length; i++) {
      let usr = this.users[i];

      if (usr.id == id) {
        user = usr;
        break;
      }
    }
    return user;
  },
};

export default userData;
