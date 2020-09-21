using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HttpSocket
{
    class ArraySegmentList<T>
    {
        List<ArraySegment<T>> m_SegmentList = new List<ArraySegment<T>>();
        public ArraySegmentList() { }

        int m_Count = 0;
        public void Add(ArraySegment<T> arraySegment)
        {
            m_Count += arraySegment.Count;
            m_SegmentList.Add(arraySegment);
        }

        public T[] ToArray()
        {
            T[] array = new T[m_Count];
            int index = 0;
            for (int i = 0; i < m_SegmentList.Count; i++)
            {
                ArraySegment<T> arraySegment = m_SegmentList[i];
                Array.Copy(arraySegment.Array,
                    0,
                    array,
                    index,
                    arraySegment.Count);
                index += arraySegment.Count;
            }
            return array;
        }
    }
}
