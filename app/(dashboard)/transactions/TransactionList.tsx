'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowDownLeft, ArrowUpRight, Trash2 } from 'lucide-react'
import { useState } from 'react'
import UpdateTransactionModal from './modal/UpdateTransactionModal'
import {
  TransactionListType,
  TransactionType,
} from '@/app/api/transaction/schema'
import DeleteTransactionModal from './modal/DeleteTransactionModal'
import { format } from 'date-fns'

const TransactionList = ({ transactions }: TransactionListType) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentTransaction, setCurrentTransaction] =
    useState<TransactionType | null>(null)

  const handleOpenUpdateModal = (transaction: TransactionType) => {
    setCurrentTransaction(transaction)
    setIsUpdateModalOpen(true)
  }

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false)
    setCurrentTransaction(null)
  }

  const handleOpenDeleteModal = (transaction: TransactionType) => {
    setCurrentTransaction(transaction)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setCurrentTransaction(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Transaction History ({transactions.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="flex items-center my-2 justify-between rounded-lg cursor-pointer"
              onClick={() => handleOpenUpdateModal(transaction)}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg bg-muted ${
                    transaction.categoryId?.type === 'Income'
                      ? 'bg-success-light'
                      : 'bg-muted'
                  }`}
                >
                  {transaction.categoryId?.type === 'Income' ? (
                    <ArrowUpRight className="h-5 w-5 text-success" />
                  ) : (
                    <ArrowDownLeft className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {transaction.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge>
                      {transaction.categoryId?.name || transaction.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {transaction.date
                        ? format(transaction.date, 'yyyy-MM-dd')
                        : 'No date available'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-end space-x-4">
                <p
                  className={`text-lg font-bold hidden md:block ${
                    transaction.categoryId?.type === 'Income'
                      ? 'text-success'
                      : 'text-foreground'
                  }`}
                >
                  {transaction.categoryId?.type === 'Income' ? '+' : '-'}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </p>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOpenDeleteModal(transaction)
                  }}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {transactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No transactions found.</p>
          </div>
        )}
      </CardContent>

      {/* Update Transaction Modal */}
      {isUpdateModalOpen && currentTransaction && (
        <UpdateTransactionModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          transaction={currentTransaction}
        />
      )}

      {/* Delete Transaction Modal */}
      {isDeleteModalOpen && currentTransaction && (
        <DeleteTransactionModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          transaction={currentTransaction}
        />
      )}
    </Card>
  )
}

export default TransactionList
