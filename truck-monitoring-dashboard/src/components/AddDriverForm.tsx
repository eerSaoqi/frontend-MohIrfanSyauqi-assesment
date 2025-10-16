import { useForm } from 'react-hook-form';
import type { Driver } from '../api/mockDrivers';

type FormData = Omit<Driver, 'id'>;

const AddDriverForm = ({ onClose, onAdd }: { onClose: () => void; onAdd: (d: Driver) => void }) => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const newDriver: Driver = { id: Date.now().toString(), ...data };
    onAdd(newDriver);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm">Name</label>
        <input {...register('name')} className="input" />
      </div>
      <div>
            <label className="block text-sm">Phone</label>
            <input {...register('phone')} className="input" />
      </div>
          <div>
            <label className="block text-sm">Photo URL</label>
            <input {...register('photoUrl')} className="input" />
          </div>
      <div>
        <label className="block text-sm">Email</label>
        <input {...register('email')} className="input" />
      </div>
      <div>
        <label className="block text-sm">License Number</label>
        <input {...register('licenseNumber')} className="input" />
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
        <button type="submit" className="btn btn-primary">Add Driver</button>
      </div>
    </form>
  );
};

export default AddDriverForm;
