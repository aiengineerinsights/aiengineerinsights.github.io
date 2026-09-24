// FTC-compliant affiliate disclosure. Render on any page that carries affiliate
// links. Kept honest and low-key: we only recommend what we'd use.
const AffiliateDisclosure = ({ className = "" }: { className?: string }) => (
  <p className={`text-xs text-muted-foreground italic border-l-2 border-border pl-3 my-4 ${className}`}>
    Some links here are affiliate links: if you buy through them, we may earn a small commission at no
    extra cost to you. We only recommend resources we'd actually point a friend to.
  </p>
);

export default AffiliateDisclosure;
