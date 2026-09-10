export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? 'brand-mark brand-mark-compact' : 'brand-mark'}>
      <span className="brand-cross" aria-hidden="true">
        <i />
        <i />
      </span>
      <span>
        <b>THE</b>
        <strong>MYRIAD</strong>
      </span>
    </span>
  );
}
