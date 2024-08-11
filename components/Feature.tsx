import {
  GifIcon,
  GiftTopIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    id: 1,
    name: "Customer can order your products right within Frames",
    description:
      "All you need to do is fill up necessary details with your reward walletAddress, get a frame link.",
    icon: ShoppingCartIcon,
  },
  {
    id: 2,
    name: "Automating Onchain Shopify Rewards",
    description:
      "Customers receive NFT rewards totally onchain for their orders.",
    icon: ShoppingBagIcon,
  },
  {
    id: 3,
    name: "Earn more onchain rewards as you buy more orders",
    description:
      "More orders will make you to earn NFT rewards, this can help to give discounts through coupons system",
    icon: GifIcon,
  },
  {
    id: 4,
    name: "Bring loyality Program onchain and appreaciate your customers with NFT rewards",
    description:
      "Customers can earn NFT rewards for their orders and can redeem them for discounts on future orders.",
    icon: GiftTopIcon,
  },
];

export default function Feature() {
  return (
    <div className="custom-features-bg py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-white">
            Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"></p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 ">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="relative pl-16 border border-black"
              >
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#01A4F1]">
                    <feature.icon
                      className="h-6 w-6 text-white bg-red-800"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-800">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
