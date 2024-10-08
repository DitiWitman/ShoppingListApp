# אפליקציית ניהול רשימת קניות

אפליקציה זו מאפשרת למשתמשים לנהל רשימות קניות, 
להוסיף מוצרים לפי קטגוריות, לעדכן כמויות ולצפות בכמות כוללת של המוצרים ברשימה. 
הממשק משתמש ב-React עם Redux לניהול מצבים, 
ומעוצב באמצעות Material-UI. 
צד השרת כתוב ב-C# במודל שלושת השכבות עם REST API.

## פיצ'רים עיקריים:
- הוספת מוצרים לפי קטגוריה
- עדכון כמות מוצרים
- ניהול כמות כוללת של המוצרים בזמן אמת בסל הקניות
- מניעה מהוספת מוצרים כפולים (עדכון כמות )
- שליפת קטגוריות ומוצרים מהשרת
- עיצוב רספונסיבי וידידותי למובייל
- ייצוא הרשימה לקובץ txt.
  ## טכנולוגיות וספריות עיקריות:
- **🌐 AWS**: שימוש בשירותי הענן של AWS לניהול שרת ותשתיות.
- **PostgreSQL**: מסד נתונים מבוזר בקוד פתוח המאפשר אחסון נתוני המוצרים והקטגוריות.
- **pgAdmin**: ממשק ניהול ויזואלי לניהול וניטור נתוני PostgreSQL.
- **React**: לבניית הממשק האינטראקטיבי
- **Redux Toolkit**: לניהול ה-state של האפליקציה
- **Material-UI**: לעיצוב קומפוננטות בצורה מקצועית ורספונסיבית
- **Axios**: לביצוע בקשות HTTP בין ה-Frontend ל-Backend
- **C#**: צד השרת בנוי ב-C# עם שימוש במודל שלושת השכבות
- **Entity Framework**: ORM לניהול בסיס הנתונים
- ## ORM:
בפרויקט זה, אנחנו משתמשים ב-Entity Framework, שהוא כלי ORM (Object-Relational Mapping) שמאפשר לעבוד עם בסיס נתונים בצורה מונחית אובייקטים. למידע נוסף על השימוש והיישום:
- [מדריך Entity Framework](https://learn.microsoft.com/en-us/ef/core/)
- ## PostgreSQL:
הוראות התקנה:https://www.postgresql.org/download/
## - עובדים כרגע על פיתוח של Docker:
כדי שתוכלו להריץ את הפרויקט ב-Docker, נשתמש ב-Dockerfile שיכיל את ההגדרות הנדרשות להרצת צד השרת והקליינט בתוך קונטיינרים.
## התקנה מקומית:

   git clone https://github.com/DitiWitman/ShoppingListApi.git
## פיצ'רים מתוכננים:
- **ייבוא מוצרים מקובצי אקסל או מאגר חנות קיים**: תתאפשר הוספת מוצרים רק מתוך רשימת מוצרים קיימת שניתן לייבא מקבצי אקסל או ממאגר נתונים של החנות.
- **סינון לפי קטגוריות**: אפשרות סינון מוצרים לפי קטגוריה כדי לייעל את החיפוש וההוספה.
- **מערכת לוגין**: תתווסף אפשרות לכניסה באמצעות משתמש וסיסמה לניהול רשימות אישיות.
  
