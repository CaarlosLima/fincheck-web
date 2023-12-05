import {
  DashboardContext,
  DashboardProvider,
} from 'src/app/context/DashboardContext';
import { Logo } from 'src/view/components/Logo';
import { UserMenu } from 'src/view/components/UserMenu';

import { Accounts } from './components/Accounts';
import { Fab } from './components/Fab';
import { Transactions } from './components/Transactions';
import { EditAccountModal } from './modals/EditAccountModal';
import { NewAccountModal } from './modals/NewAccountModal';
import { NewTransactionModal } from './modals/NewTransactionModal';

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="flex flex-col gap-4 h-full w-full p-4 md:p-8 md:pt-6">
            <header className="h-12 flex items-center justify-between">
              <Logo className="h-6 text-teal-900" />

              <UserMenu />
            </header>

            <main className="flex flex-col flex-1 gap-4 max-h-full md:flex-row">
              <section className="w-full md:w-1/2">
                <Accounts />
              </section>

              <section className="w-full md:w-1/2">
                <Transactions />
              </section>
            </main>

            <Fab />

            <NewAccountModal />

            {accountBeingEdited && <EditAccountModal />}

            <NewTransactionModal />
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
