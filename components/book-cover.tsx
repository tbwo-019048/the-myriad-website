export function BookCover({
  title,
  className,
  number,
}: {
  title: string;
  className: string;
  number?: number;
}) {
  return (
    <div className={'book-cover ' + className} aria-label={'Cover of ' + title}>
      <span className="cover-author">TOBY CROME</span>
      <span className="cover-grid" aria-hidden="true" />
      {number && <span className="cover-file">FILE // 0{number}</span>}
      <strong>{title}</strong>
      <span className="cover-rule" />
      <small>A MYRIAD FILES THRILLER</small>
    </div>
  );
}
