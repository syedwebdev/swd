import { useState, ImgHTMLAttributes } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Optional fallback src to try if the primary src fails. */
  fallbackSrc?: string;
  /** Wrapper classes (the wrapper holds the skeleton + image). */
  wrapperClassName?: string;
}

/**
 * Image with built-in skeleton placeholder while loading and a graceful
 * fallback (alternate src or icon) on error.
 */
export const SmartImage = ({
  src,
  alt,
  className,
  wrapperClassName,
  fallbackSrc,
  onLoad,
  onError,
  ...rest
}: SmartImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src as string | undefined);

  return (
    <div className={cn('absolute inset-0', wrapperClassName)}>
      {!loaded && !errored && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" aria-hidden />
      )}
      {errored ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-muted/40 text-muted-foreground"
        >
          <ImageOff className="w-6 h-6 opacity-60" aria-hidden />
        </div>
      ) : (
        <img
          {...rest}
          src={currentSrc}
          alt={alt}
          className={cn(
            className,
            'transition-opacity duration-300',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={(e) => {
            setLoaded(true);
            onLoad?.(e);
          }}
          onError={(e) => {
            if (fallbackSrc && currentSrc !== fallbackSrc) {
              setCurrentSrc(fallbackSrc);
              return;
            }
            setErrored(true);
            onError?.(e);
          }}
        />
      )}
    </div>
  );
};
