const Course = require('../../models/Course');
const Teacher = require('../../models/Teacher');

const courseTeacher = async (course) => {
  return Teacher.findById(course.teacherId);
};

const course = async (parent, args) => {
  return Course.findById(args.id);
};

const courses = async (parent, args) => {
  return Course.find();
};

const addCourse = async (parent, args) => {
  const course = new Course({
    name: args.name,
    description: args.description,
    status: args.status.toString(),
    teacherId: args.teacherId,
  });

  return course.save();
};

const deleteCourse = async (parent, args) => {
  return Course.findByIdAndRemove(args.id);
};

module.exports = {
  courseTeacher,
  course,
  courses,
  addCourse,
  deleteCourse,
};
