import TaskItem from '../task-item';
import { TaskList as TaskListType } from '../../models/task';

type TaskListProps = {
  tasks: TaskListType;
};

function TaskList({ tasks }: TaskListProps) {
  return (
    <section className="min-w-72">
      {tasks.map((task) => (
        <article key={task.id}>
          <TaskItem {...task} />
        </article>
      ))}
    </section>
  );
}

export default TaskList;
