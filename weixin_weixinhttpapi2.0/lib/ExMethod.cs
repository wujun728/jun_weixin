using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HttpSocket
{
    public static class ExMethod
    {
        public static void Foreach<T>(this IEnumerable<T> objValue, Action<T> fun)
        {
            foreach (T t in objValue)
            {
                fun(t);
            }
        }
    }
}
