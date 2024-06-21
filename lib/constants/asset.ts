import { AssetState } from '../@types/api';

export const AssetStateOptions = {
  [AssetState.AVAILABLE]: 'Available',
  [AssetState.UNAVAILABLE]: 'Not Available',
  [AssetState.ASSIGNED]: 'Assigned',
  [AssetState.WAITING_FOR_RECYCLING]: 'Waiting for recycling',
  [AssetState.RECYCLED]: 'Recycled',
};