import Tasks from './components/Tasks/Tasks';

export default function Home() {
  return (
    <>
      <Tasks pageTitle="All Tasks" filterCompleted={null} isImportant={null} />
    </>
  );
}
