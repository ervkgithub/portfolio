function AppFooterCopyright() {
  return (
    <div className="font-general-regular flex justify-center items-center text-center">
      <div className="text-lg text-ternary-dark dark:text-ternary-light">
        &copy; {new Date().getFullYear()}
        <span className="hover:text-indigo-600 dark:hover:text-indigo-300 ml-1 duration-500">
          Vijay Kumar&apos;s Portfolio
        </span>
      </div>
    </div>
  );
}

export default AppFooterCopyright;
