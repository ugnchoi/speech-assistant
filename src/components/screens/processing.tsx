export const Processing = () => {
  return (
    <div className="screen-fade-in space-y-12">
      <h1 className="text-screen-title text-balance text-center text-foreground">
        청중의 반응을 준비하고 있습니다
      </h1>
      <div className="flex flex-col items-center gap-4" role="status" aria-live="polite" aria-label="처리 중">
        <span className="processing-dot" aria-hidden />
        <p className="text-helper text-center text-muted-foreground">잠시만 기다려 주세요</p>
      </div>
    </div>
  );
};
