import { reviews, scoreCards } from '@/content/reviews'
import { QuoteIcon, StarIcon } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'

function QuoteCell({
  review,
  className,
}: {
  review: (typeof reviews)[0]
  className?: string
}) {
  return (
    <div
      className={`quote ${review.isWide ? 'w' : ''} ${className || ''}`}
      data-q
      style={review.isWide ? { gridColumn: 'span 2' } : undefined}
    >
      <div className="qt">
        <p className="t-reg t-bold">&ldquo;{review.quote}&rdquo;</p>
        <QuoteIcon className="h-[3.33rem] w-[3.33rem] fill-none stroke-[#D2D2D2] stroke-[1.2]" />
      </div>
      <div className="who">
        <p className="t-reg grey">
          {review.clientName.split(',').map((part, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {part.trim()}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

function ScoreCard({ card, className }: { card: (typeof scoreCards)[0]; className?: string }) {
  return (
    <div className={`score ${className || ''}`}>
      <div>
        <p className="sc">
          {card.mainValue} <small>{card.mainLabel}</small>
        </p>
        <div className="stars" role="img" aria-label="5 out of 5 stars">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="h-[1.43rem] w-[1.43rem] fill-[#FFC21A]" />
          ))}
        </div>
      </div>
      <dl className="t-reg">
        {card.stats.map((stat, index) => (
          <div key={index} className="contents">
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function Reviews() {
  return (
    <div className="g4" id="reviews">
      <div className="rv-title ln lr lb">
        <span className="eyebrow">Client reviews</span>
        <h2 className="h-large" data-split>
          What they say
        </h2>
      </div>
      <QuoteCell review={reviews[0]} className="ln lr lb" />
      <QuoteCell review={reviews[1]} className="ln lb" />
      <QuoteCell review={reviews[2]} className="ln lr lb" />
      <ScoreCard card={scoreCards[0]} className="ln lb" />
      <ScoreCard card={scoreCards[1]} className="ln lr lb" />
      <QuoteCell review={reviews[3]} className="ln lr lb" />
      <QuoteCell review={reviews[4]} className="ln lb" />
      <QuoteCell review={reviews[5]} className="ln lr lb" />
      <QuoteCell review={reviews[6]} className="ln lr lb" />
      <div className="center ln lb">
        <Button href="https://www.upwork.com/freelancers/~013f9f91b47aa1ba3c" target="_blank" rel="noopener noreferrer">
          All reviews on Upwork
        </Button>
      </div>
    </div>
  )
}
