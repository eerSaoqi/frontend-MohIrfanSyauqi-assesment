import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { addTruck } from '../trucksSlice';
import type { Truck } from '../../../api/mockData';

type FormData = {
  driver: string;
  plateNumber: string;
  capacity: number;
  status: Truck['status'];
  address: string;
  photoUrl?: string;
};

const AddTruckForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const newTruck: Truck = {
      id: Date.now().toString(),
      driver: data.driver,
      plateNumber: data.plateNumber,
      capacity: Number(data.capacity),
      status: data.status,
      location: { lat: 0, lng: 0, address: data.address },
      photoUrl: data.photoUrl,
      lastSeen: new Date().toISOString(),
      currentLoad: 0,
      fuelLevel: 100,
    };

    dispatch(addTruck(newTruck));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm">Driver</label>
        <input {...register('driver')} className="input" />
      </div>
      <div>
        <label className="block text-sm">Plate Number</label>
        <input {...register('plateNumber')} className="input" />
      </div>
      <div>
            <label className="block text-sm">Capacity (kg)</label>
            <input type="number" {...register('capacity')} className="input" />
      </div>
          <div>
            <label className="block text-sm">Photo URL</label>
            <input {...register('photoUrl')} className="input" />
          </div>
      <div>
        <label className="block text-sm">Status</label>
        <select {...register('status')} className="input">
          <option value="active">Active</option>
          <option value="idle">Idle</option>
          <option value="maintenance">Maintenance</option>
          <option value="offline">Offline</option>
        </select>
      </div>
      <div>
        <label className="block text-sm">Address</label>
        <input {...register('address')} className="input" />
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary">Add Truck</button>
      </div>
    </form>
  );
};

export default AddTruckForm;
