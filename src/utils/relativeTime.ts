// Side-effect module: extends the shared dayjs singleton with the
// relativeTime plugin ("2 minutes ago") once, at app start. Import this file
// (not just 'dayjs') from anywhere that needs .fromNow() to guarantee the
// plugin is registered before use, regardless of module load order.
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default dayjs;
