import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import ProductTabEmptyState from '@/components/dashboard/products/components/product-details/product-info/product-tab-empty';
import type { ProductTabsProps } from '@/interfaces/product';

export default function ProductTabs({ product }: ProductTabsProps) {
  const { description, features, attributes } = product;

  return (
    <div className="mt-10">
      <Tabs defaultValue="description">
        <TabsList className="mx-auto rounded-sm bg-gray-200 px-2 py-4 md:mx-0">
          <TabsTrigger
            value="description"
            className="rounded-sm p-3 data-[state=active]:bg-[#f5f5f5]"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="attributes"
            className="rounded-sm p-3 data-[state=active]:bg-[#f5f5f5]"
          >
            Attributes
          </TabsTrigger>
          <TabsTrigger value="features" className="rounded-sm p-3 data-[state=active]:bg-[#f5f5f5]">
            Features
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-2">
          {description ? (
            <div className="rounded-sm border bg-white p-4 leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0">
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          ) : (
            <ProductTabEmptyState message="No description available for this product." />
          )}
        </TabsContent>
        <TabsContent value="attributes" className="pt-2">
          {attributes?.length > 0 ? (
            <div className="rounded-sm border">
              <Table>
                <TableBody>
                  {attributes.map(attribute => (
                    <TableRow
                      key={attribute.title}
                      className="even:bg-gray-100 hover:bg-transparent even:hover:bg-gray-100"
                    >
                      <TableCell className="p-4 font-medium">{attribute.title}</TableCell>
                      <TableCell className="p-4">{attribute.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <ProductTabEmptyState message="No attributes available for this product." />
          )}
        </TabsContent>
        <TabsContent value="features" className="pt-2">
          {features?.length > 0 ? (
            <div className="rounded-sm border">
              <Table>
                <TableBody>
                  {features.map(feature => (
                    <TableRow
                      key={feature.title}
                      className="even:bg-gray-100 hover:bg-transparent even:hover:bg-gray-100"
                    >
                      <TableCell className="p-4 font-medium">{feature.title}</TableCell>
                      <TableCell className="p-4">{feature.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <ProductTabEmptyState message="No features available for this product." />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
