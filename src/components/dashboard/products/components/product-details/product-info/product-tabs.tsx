import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils/shared/class-merge';
import type { ProductTabsProps } from '@/interfaces/product';

export default function ProductTabs({ product }: ProductTabsProps) {
  const { description, rating, reviews } = product;

  return (
    <div className="mt-16">
      <Tabs defaultValue="description">
        <TabsList className="h-auto w-full justify-start rounded-none border-b p-0">
          <TabsTrigger
            value="description"
            className="data-[state=active]:border-primary rounded-none py-3 data-[state=active]:border-b-2"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="data-[state=active]:border-primary rounded-none py-3 data-[state=active]:border-b-2"
          >
            Nutritional Details
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:border-primary rounded-none py-3 data-[state=active]:border-b-2"
          >
            Reviews ({reviews.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-6">
          <div className="space-y-4">
            <p>{description}</p>
            <p>
              Made with high-quality materials and ingredients, this product is safe and beneficial
              for your pet&apos;s health and happiness.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Premium quality materials</li>
              <li>Designed for pet comfort and enjoyment</li>
              <li>Durable and long-lasting</li>
              <li>Safe for all pets</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="details" className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Nutritional Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Ingredients</h4>
                <p className="text-muted-foreground mt-1 text-sm">
                  Premium protein sources, whole grains, vegetables, essential vitamins and
                  minerals.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Guaranteed Analysis</h4>
                <ul className="text-muted-foreground mt-1 space-y-1 text-sm">
                  <li>Crude Protein: 26% min</li>
                  <li>Crude Fat: 15% min</li>
                  <li>Crude Fiber: 4% max</li>
                  <li>Moisture: 10% max</li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="font-medium">Feeding Guidelines</h4>
              <p className="text-muted-foreground mt-1 text-sm">
                Feed adult pets 1/2 to 1 cup per 10 pounds of body weight daily, divided into two
                meals. Adjust as needed to maintain ideal body condition.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <div className="mt-1 flex items-center">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-5 w-5',
                            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          )}
                        />
                      ))}
                  </div>
                  <span className="text-muted-foreground ml-2 text-sm">
                    Based on {reviews.length} reviews
                  </span>
                </div>
              </div>
              <Button>Write a Review</Button>
            </div>

            <div className="space-y-6">
              {[
                {
                  name: 'Alex Johnson',
                  rating: 5,
                  date: '2 months ago',
                  comment: 'My pet absolutely loves this! Great quality and fast shipping.',
                },
                {
                  name: 'Sam Wilson',
                  rating: 4,
                  date: '3 months ago',
                  comment: "Good product overall. My pet enjoys it, but it's a bit pricey.",
                },
                {
                  name: 'Jamie Smith',
                  rating: 5,
                  date: '4 months ago',
                  comment: 'Excellent quality! Will definitely purchase again.',
                },
              ].map((review, index) => (
                <div key={index} className="border-b pb-6 last:border-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{review.name}</p>
                      <div className="mt-1 flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'h-4 w-4',
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              )}
                            />
                          ))}
                      </div>
                    </div>
                    <span className="text-muted-foreground text-sm">{review.date}</span>
                  </div>
                  <p className="mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
