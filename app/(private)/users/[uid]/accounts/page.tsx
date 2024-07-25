import { AiOutlinePlus } from 'react-icons/ai';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UserAccountsPage() {
  return (
    <section>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-3xl">Accounts</h2>
        <Link href="create-account">
          <Button className="rounded-full" variant="secondary" size="sm">
            <AiOutlinePlus /> Create Account
          </Button>
        </Link>
      </div>
      {/* <Card className="p-4">
        {company && <CompanyDetailsSection {...company} />}
        <JobForm companyDetails={company} />
      </Card> */}
    </section>
  );
}
