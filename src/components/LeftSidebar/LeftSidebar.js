import BuySellCard from '@/components/BuySellCard/BuySellCard'
import { usePrices } from '@/contexts/PriceContext'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap'
import { BsTextParagraph } from 'react-icons/bs'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { IoFilterOutline } from 'react-icons/io5'
import { MdDeleteOutline } from 'react-icons/md'
import { RxDotsHorizontal, RxDragHandleDots2 } from 'react-icons/rx'
import { VscGraphLine } from 'react-icons/vsc'
import styles from './LeftSidebar.module.css'

function SortableItem({ item, isProfit, onBuy, onSell }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.name })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <ListGroup.Item
        className={`${styles.tableRow} ${styles.rowWithDrag} ${styles.shareList} ${styles.hoverEffect} d-flex align-items-center text-center`}
      >
        <Row className="w-100">
          <Col
            className={`${styles.tableColumn} ${
              styles.hoverEffectColumnShow ? '-me-2' : '-me-2'
            }`}
          >
            <span className={styles.dragHandle} {...listeners} {...attributes}>
              <RxDragHandleDots2 size={16} style={{ fontWeight: '500' }} />
            </span>
            {item.name}
          </Col>

          <Col
            className={`${isProfit ? 'text-success' : 'text-danger'} ${
              styles.tableColumn
            } text-end ${styles.hoverEffectColumnBlock}`}
          >
            {isProfit ? `+${item.change}` : item.change}
          </Col>

          <Col
            className={`${isProfit ? 'text-success' : 'text-danger'} ${
              styles.tableColumn
            } text-end ${styles.hoverEffectColumnShow}`}
          >
            <Button
              variant="primary"
              className={`border-0 me-xxl-1 py-0 px-2 ${styles.hoverBtnBuySell}`}
              onClick={(e) => {
                e.stopPropagation()
                onBuy(item)
              }}
            >
              B
            </Button>
            <Button
              variant="danger"
              className={`border-0 py-0 px-2 ${styles.hoverBtnBuySell}`}
              onClick={(e) => {
                e.stopPropagation()
                onSell(item)
              }}
            >
              S
            </Button>
          </Col>

          <Col
            className={`${isProfit ? 'text-success' : 'text-danger'} ${
              styles.tableColumn
            } text-end ${styles.hoverEffectColumnBlock}`}
          >
            {isProfit ? `+${item.percent}% ▲` : `${item.percent}% ▼`}
          </Col>

          <Col
            className={`${isProfit ? 'text-success' : 'text-danger'} ${
              styles.tableColumn
            } text-end ${styles.hoverEffectColumnShow}`}
          >
            <Button className={`border-0 me-1 py-0 px-1 ${styles.hoverBtn}`}>
              <BsTextParagraph />
            </Button>
            <Button className={`border-0 py-0 px-1 ${styles.hoverBtn}`}>
              <VscGraphLine />
            </Button>
          </Col>

          <Col
            className={`${isProfit ? 'text-success' : 'text-danger'} ${
              styles.tableColumn
            } text-end ${styles.hoverEffectColumnBlock}`}
          >
            ${item.price}
          </Col>

          <Col
            className={`${isProfit ? 'text-success' : 'text-danger'} ${
              styles.tableColumn
            } text-end ${styles.hoverEffectColumnShow}`}
          >
            <Button className={`border-0 me-1 py-0 px-1 ${styles.hoverBtn}`}>
              <MdDeleteOutline />
            </Button>
            <Button className={`border-0 py-0 px-1 ${styles.hoverBtn}`}>
              <RxDotsHorizontal />
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    </div>
  )
}

export default function LeftSidebar() {
  const { data, loading } = usePrices()
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [popupData, setPopupData] = useState(null)
  const [popupType, setPopupType] = useState(null)

  useEffect(() => {
    if (data?.length) {
      const savedOrder = JSON.parse(
        localStorage.getItem('priceListOrder') || '[]'
      )
      if (savedOrder.length) {
        const ordered = savedOrder
          .map((id) => data.find((item) => item.name === id))
          .filter(Boolean)
        const newOnes = data.filter((d) => !savedOrder.includes(d.name))
        setItems([...ordered, ...newOnes])
      } else {
        setItems(data)
      }
    }
  }, [data])

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event
      if (!over || active.id === over.id) return
      const oldIndex = items.findIndex((i) => i.name === active.id)
      const newIndex = items.findIndex((i) => i.name === over.id)
      const newList = arrayMove(items, oldIndex, newIndex)
      setItems(newList)
      localStorage.setItem(
        'priceListOrder',
        JSON.stringify(newList.map((i) => i.name))
      )
    },
    [items]
  )

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items
    return items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [items, search])

  return (
    <Col className={`${styles.leftColumn} ${styles.leftColumnDisplay} pt-3`}>
      <InputGroup className="mb-3">
        <InputGroup.Text className={`rounded-0 ${styles.inputGroupStyle}`}>
          <HiMagnifyingGlass />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search eg: infy bse, nifty fut, index fund, etc"
          value={search}
          className={`rounded-0 ${styles.inputGroupStyle}`}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroup.Text className={`rounded-0 ${styles.inputGroupStyle}`}>
          <IoFilterOutline />
        </InputGroup.Text>
      </InputGroup>

      <div className={`h-100 ${styles.scrollContainer}`}>
        <div className={`fw-bold smallFontSize p-2 ${styles.borderStyle}`}>
          <Row className="text-center">
            <Col>Token</Col>
            <Col>Change ($)</Col>
            <Col>%</Col>
            <Col>Price</Col>
          </Row>
        </div>

        {loading ? (
          <div className="text-center p-2">Loading...</div>
        ) : (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={filteredItems.map((i) => i.name)}
              strategy={verticalListSortingStrategy}
            >
              <ListGroup
                variant="flush"
                className={`mediumFontSize ${styles.borderStyle}`}
              >
                {filteredItems.map((item) => (
                  <SortableItem
                    key={item.name}
                    item={item}
                    isProfit={parseFloat(item.change) > 0}
                    onBuy={(coin) => {
                      setPopupData(coin)
                      setPopupType('buy')
                    }}
                    onSell={(coin) => {
                      setPopupData(coin)
                      setPopupType('sell')
                    }}
                  />
                ))}
              </ListGroup>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {popupData && (
        <BuySellCard
          type={popupType}
          item={popupData}
          onClose={() => setPopupData(null)}
        />
      )}
    </Col>
  )
}
