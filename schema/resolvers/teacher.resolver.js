const Teacher = require('../../models/Teacher');
const Course = require('../../models/Course');

const teacher = async (parent, args) => {
  return Teacher.findById(args.id);
};

const teachers = async (parent, args) => {
  return Teacher.find();
};

addTeacher = async (parent, args) => {
  const teacher = new Teacher({
    name: args.name,
    email: args.email,
    phone: args.phone,
  });

  return teacher.save();
};

deleteTeacher = async (parent, args) => {
  Course.find({ teacherId: args.id }).then((courses) => {
    courses.forEach((course) => {
      course.remove();
    });
  });

  return Teacher.findByIdAndRemove(args.id);
};

module.exports = {
  teacher,
  teachers,
  addTeacher,
  deleteTeacher,
};
