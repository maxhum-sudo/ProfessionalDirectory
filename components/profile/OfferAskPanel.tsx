interface OfferAskPanelProps {
  offering: string
  seeking: string
}

export const OfferAskPanel: React.FC<OfferAskPanelProps> = ({
  offering,
  seeking,
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 mb-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3 tracking-wide">
            OFFERING
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap">{offering}</p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3 tracking-wide">
            SEEKING
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap">{seeking}</p>
        </div>
      </div>
    </div>
  )
}
