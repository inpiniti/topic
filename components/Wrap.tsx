export const Wrap = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative">
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-0 left-0 text-red-400">{title}</div>
      )}
      {children}
    </div>
  );
};
