/𝄞/.test( "𝄞-clef" );			// true

/^.-clef/ .test( "𝄞-clef" );		// false
/^.-clef/u.test( "𝄞-clef" );		// true