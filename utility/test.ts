import { Pool } from 'pg';
const pool = new Pool({
    connectionString: 'postgresql://postgres:1234@localhost:5432/db1'
  });
interface Course {
  id: string;
  name: string;
  slots: Array<{
    id: number;
    timings: {
      day: string;
      start: string;
      end: string;
    }[];
  }>;
  
  faculties: Array<{
    id: number;
    name: string;

  }>;
  courseType: string;
}



async function getCourses(): Promise<Course[]> {
  const coursesQuery = `
    SELECT
      courses.id,
      courses.name,
      courses.course_type,
      slots.id AS slot_id,
      slots.timings,
      faculties.id AS faculty_id,
      faculties.name AS faculty_name
    FROM
      courses
      LEFT JOIN slots ON slots.id = ANY (courses.slot_ids)
      LEFT JOIN faculties ON faculties.id = ANY (courses.faculty_ids)
    
  `;
  const { rows } = await pool.query(coursesQuery);

  const courses = rows.reduce<Course[]>((acc, row) => {
    const courseIndex = acc.findIndex(course => course.id === row.id);

    if (courseIndex != -1) {
      const course: Course = {
        id: row.id,
        name: row.name,
        courseType: row.course_type,
        slots: [],
        faculties: [],
      };
      if (row.slot_id) {
        course.slots.push({
          id: row.slot_id,
          timings: row.timings,
        });
      }
      if (row.faculty_id) {
        course.faculties.push({
          id: row.faculty_id,
          name: row.faculty_name,
        });
      }
      acc.push(course);
    } else {
      if (row.slot_id) {
        acc[courseIndex].slots.push({
          id: row.slot_id,
          timings: row.timings,
        });
      }
      if (row.faculty_id) {
        acc[courseIndex].faculties.push({
          id: row.faculty_id,
          name: row.faculty_name,
          
        });
      }
    }

    return acc;
  }, []);

  return courses;
}

// Example usage
async function main() {
  const courses = await getCourses();
  console.log(courses[0]);
  
}

main().catch(console.error);
