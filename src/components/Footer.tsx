export default function Footer() {
  return (
    <footer className="bg-white mt-8 border-t">
      <div className="container mx-auto px-4 py-6 text-sm text-gray-600 flex flex-col md:flex-row gap-4 justify-between">
        <p>
          &copy; {new Date().getFullYear()} RushNow Shopping,Everything will be delivered to you in minutes.
        </p>
      {/*  <p>All product names & images are placeholders.</p> */}
      </div>
    </footer>
  );
}
