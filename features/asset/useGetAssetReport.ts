import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { PaginationApiProps } from '@/lib/@types/api';

import assetApi from './asset.service';
import type { AssetReportSortField } from './asset.types';

export type GetAssetReportProps = PaginationApiProps<AssetReportSortField>;

function useGetAssetReport(props: GetAssetReportProps, queryKey?: string) {
  return useQuery({
    queryKey: [`asset-report`, queryKey ?? JSON.stringify(props)],
    queryFn: async () => {
      const assets = await assetApi.getAssetReport(props);
      return assets;
    },
    placeholderData: keepPreviousData,
  });
}

export default useGetAssetReport;
