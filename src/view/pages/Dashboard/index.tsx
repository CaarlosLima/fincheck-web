import { Logo } from '../../components/Logo';
import { UserMenu } from '../../components/UserMenu';

import { Accounts } from './components/Accounts';

export function Dashboard() {
  return (
    <div className="flex flex-col gap-4 h-full w-full p-4 md:p-8 md:pt-6">
      <header className="h-12 flex items-center justify-between">
        <Logo className="h-6 text-teal-900" />

        <UserMenu />
      </header>

      <main className="flex flex-col flex-1 gap-4 md:flex-row">
        <section className="w-full md:w-1/2">
          <Accounts />
        </section>
      </main>
    </div>
  );
}
