const Invisible = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="opacity-0 pointer-events-none">{children}</div>;
};

export default Invisible;
