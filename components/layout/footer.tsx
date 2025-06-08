export default function Footer() {
  return (
    <div className="absolute w-full py-5 text-center">
      <p className="text-gray-500">
        Data provided by{" "}
        <a
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://www.mta.info/developers"
          target="_blank"
          rel="noopener noreferrer"
        >
          MTA
        </a>
      </p>
    </div>
  );
}
